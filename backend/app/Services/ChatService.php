<?php

namespace App\Services;

use App\Models\Chat;
use App\Models\Message;
use App\Events\NewMessage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class ChatService
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function createChat($data)
    {
        return DB::transaction(function () use ($data) {
            $chat = Chat::create([
                'tutor_id' => $data['tutor_id'],
                'guardian_id' => $data['guardian_id'],
                'tuition_id' => $data['tuition_id'],
                'status' => 'active'
            ]);

            // Send notifications to both parties
            $this->notificationService->send(
                $data['tutor_id'],
                'new_chat',
                'New chat conversation started',
                ['chat_id' => $chat->id]
            );

            $this->notificationService->send(
                $data['guardian_id'],
                'new_chat',
                'New chat conversation started',
                ['chat_id' => $chat->id]
            );

            return $chat;
        });
    }

    public function sendMessage($data)
    {
        return DB::transaction(function () use ($data) {
            // Encrypt message content
            $encryptedContent = Crypt::encryptString($data['content']);

            $message = Message::create([
                'chat_id' => $data['chat_id'],
                'sender_id' => $data['sender_id'],
                'content' => $encryptedContent,
                'type' => $data['type'] ?? 'text'
            ]);

            // Get recipient ID
            $chat = Chat::find($data['chat_id']);
            $recipientId = $chat->tutor_id == $data['sender_id'] 
                ? $chat->guardian_id 
                : $chat->tutor_id;

            // Send notification
            $this->notificationService->send(
                $recipientId,
                'new_message',
                'You have a new message',
                ['chat_id' => $data['chat_id']]
            );

            // Broadcast new message event
            broadcast(new NewMessage($message))->toOthers();

            return $message;
        });
    }

    public function getMessages($chatId, $page = 1, $perPage = 20)
    {
        $messages = Message::where('chat_id', $chatId)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        // Decrypt messages
        $messages->getCollection()->transform(function ($message) {
            $message->content = Crypt::decryptString($message->content);
            return $message;
        });

        return $messages;
    }

    public function markAsRead($messageId, $userId)
    {
        return Message::where('id', $messageId)
            ->update([
                'read_at' => now(),
                'read_by' => $userId
            ]);
    }

    public function getUnreadCount($userId)
    {
        return Message::whereHas('chat', function ($query) use ($userId) {
            $query->where('tutor_id', $userId)
                ->orWhere('guardian_id', $userId);
        })
        ->whereNull('read_at')
        ->where('sender_id', '!=', $userId)
        ->count();
    }

    public function getActiveChats($userId)
    {
        return Chat::where('tutor_id', $userId)
            ->orWhere('guardian_id', $userId)
            ->where('status', 'active')
            ->with(['lastMessage', 'tutor:id,name', 'guardian:id,name'])
            ->get();
    }
}