import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 액션들
export const fetchChatRooms = createAsyncThunk(
    'chat/fetchChatRooms',
    async (_, { rejectWithValue }) => {
        try {
            // TODO: API 호출 구현
            return [];
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '채팅방 목록을 불러오는데 실패했습니다.');
        }
    }
);

export const joinChatRoom = createAsyncThunk(
    'chat/joinChatRoom',
    async ({ roomId, userId }, { rejectWithValue }) => {
        try {
            // TODO: API 호출 구현
            return { roomId, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || '채팅방 입장에 실패했습니다.');
        }
    }
);

const initialState = {
    // 채팅방 관련
    chatRooms: [],
    currentRoom: null,
    joinedRooms: [],

    // 메시지 관련
    messages: {}, // roomId별로 메시지 저장
    currentRoomMessages: [],

    // 참여자 관련
    participants: {}, // roomId별로 참여자 저장

    // 실시간 상태
    typingUsers: [], // 현재 타이핑 중인 사용자들
    onlineUsers: [], // 온라인 사용자들

    // UI 상태
    loading: false,
    error: null,
    messageLoading: false,
    hasMoreMessages: true,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // 현재 채팅방 설정
        setCurrentRoom: (state, action) => {
            state.currentRoom = action.payload;
            state.currentRoomMessages = state.messages[action.payload?.roomId] || [];
        },

        // 메시지 추가
        addMessage: (state, action) => {
            const { roomId, message } = action.payload;
            if (!state.messages[roomId]) {
                state.messages[roomId] = [];
            }
            state.messages[roomId].push(message);

            // 현재 방의 메시지라면 currentRoomMessages도 업데이트
            if (state.currentRoom?.roomId === roomId) {
                state.currentRoomMessages.push(message);
            }
        },

        // 메시지 목록 설정
        setMessages: (state, action) => {
            const { roomId, messages } = action.payload;
            state.messages[roomId] = messages;

            if (state.currentRoom?.roomId === roomId) {
                state.currentRoomMessages = messages;
            }
        },

        // 메시지 업데이트 (수정된 메시지)
        updateMessage: (state, action) => {
            const { roomId, messageId, updates } = action.payload;
            if (state.messages[roomId]) {
                const messageIndex = state.messages[roomId].findIndex(msg => msg.messageId === messageId);
                if (messageIndex !== -1) {
                    state.messages[roomId][messageIndex] = { ...state.messages[roomId][messageIndex], ...updates };
                }
            }

            // 현재 방의 메시지도 업데이트
            if (state.currentRoom?.roomId === roomId) {
                const currentMessageIndex = state.currentRoomMessages.findIndex(msg => msg.messageId === messageId);
                if (currentMessageIndex !== -1) {
                    state.currentRoomMessages[currentMessageIndex] = { ...state.currentRoomMessages[currentMessageIndex], ...updates };
                }
            }
        },

        // 타이핑 사용자 추가/제거
        setTypingUsers: (state, action) => {
            state.typingUsers = action.payload;
        },

        addTypingUser: (state, action) => {
            const userId = action.payload;
            if (!state.typingUsers.includes(userId)) {
                state.typingUsers.push(userId);
            }
        },

        removeTypingUser: (state, action) => {
            const userId = action.payload;
            state.typingUsers = state.typingUsers.filter(id => id !== userId);
        },

        // 온라인 사용자 설정
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

        // 참여자 설정
        setParticipants: (state, action) => {
            const { roomId, participants } = action.payload;
            state.participants[roomId] = participants;
        },

        // 채팅방 목록 설정
        setChatRooms: (state, action) => {
            state.chatRooms = action.payload;
        },

        // 채팅방 추가
        addChatRoom: (state, action) => {
            state.chatRooms.push(action.payload);
        },

        // 가입한 채팅방 설정
        setJoinedRooms: (state, action) => {
            state.joinedRooms = action.payload;
        },

        // 에러 클리어
        clearError: (state) => {
            state.error = null;
        },

        // 채팅 상태 초기화
        resetChatState: (state) => {
            state.currentRoom = null;
            state.currentRoomMessages = [];
            state.typingUsers = [];
            state.participants = {};
            state.messages = {};
        },
    },

    extraReducers: (builder) => {
        builder
            // 채팅방 목록 가져오기
            .addCase(fetchChatRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.chatRooms = action.payload;
            })
            .addCase(fetchChatRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 채팅방 입장
            .addCase(joinChatRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinChatRoom.fulfilled, (state, action) => {
                state.loading = false;
                // 가입한 방 목록에 추가 (중복 체크)
                const roomId = action.payload.roomId;
                if (!state.joinedRooms.find(room => room.roomId === roomId)) {
                    state.joinedRooms.push(action.payload);
                }
            })
            .addCase(joinChatRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setCurrentRoom,
    addMessage,
    setMessages,
    updateMessage,
    setTypingUsers,
    addTypingUser,
    removeTypingUser,
    setOnlineUsers,
    setParticipants,
    setChatRooms,
    addChatRoom,
    setJoinedRooms,
    clearError,
    resetChatState,
} = chatSlice.actions;

// 셀렉터들
export const selectChat = (state) => state.chat;
export const selectChatRooms = (state) => state.chat.chatRooms;
export const selectCurrentRoom = (state) => state.chat.currentRoom;
export const selectCurrentRoomMessages = (state) => state.chat.currentRoomMessages;
export const selectJoinedRooms = (state) => state.chat.joinedRooms;
export const selectTypingUsers = (state) => state.chat.typingUsers;
export const selectOnlineUsers = (state) => state.chat.onlineUsers;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;
export const selectMessagesByRoomId = (roomId) => (state) => state.chat.messages[roomId] || [];
export const selectParticipantsByRoomId = (roomId) => (state) => state.chat.participants[roomId] || [];

export default chatSlice.reducer;