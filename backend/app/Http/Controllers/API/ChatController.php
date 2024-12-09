<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    protected $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function createChat(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tutor_id' => 'required|exists:tutors,id',
            'guardian_id' => 'required|exists:guardians,id',
            'tuition_id' => 'required|exists:tuitions,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $chat = $this->chatService->createChat($request->all());
        return response()->json($chat);
    }

    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'chat_id' => 'required|exists:chats,id',
            'content' => 'required|string',
            'type' => 'nullable|in:text,image,file'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $message = $this->chatService->sendMessage([
            'chat_id' => $request->chat_id,
            'sender_id' => $request->user()->id,
            'content' => $request->content,
            'type' => $request->type ?? 'text'
        ]);

        return response()->json($message);
    }

    public function getMessages(Request $request, $chatId)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 20);

        $messages = $this->chatService->getMessages($chatId, $page, $perPage);
        return response()->json($messages);
    }

    public function markAsRead(Request $request, $messageId)
    {
        $this->chatService->markAsRead($messageId, $request->user()->id);
        return response()->json(['message' => 'Message marked as read']);
    }

    public function getUnreadCount(Request $request)
    {
        $count = $this->chatService->getUnreadCount($request->user()->id);
        return response()->json(['count' => $count]);
    }

    public function getActiveChats(Request $request)
    {
        $chats = $this->chatService->getActiveChats($request->user()->id);
        return response()->json($chats);
    }
}