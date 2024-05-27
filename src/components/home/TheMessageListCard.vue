<template>
  <div
    id="message-card-area"
    class="border flex flex-col bg-secondary overflow-hidden flex-grow sm:max-h-[640px]"
  >
    <!-- message -->
    <div class="grow overflow-y-auto">
      <div
        v-if="loading"
        class="flex justify-center my-8"
      >
        <v-progress-circular
          indeterminate
          :size="80"
          :width="8"
          color="primary"
        />
      </div>
      <div v-else-if="messageList.length > 0">
        <custom-message-card
          v-for="message in messageList"
          :key="message.id" 
          class="border-b"
          :message="message"
          @message-card-click="handleMessageCardClick"
        />
      </div>
      <div
        v-else
        class="flex items-center flex-col"
      >
        <v-icon
          size="100px"
          class="text-gray-400 mt-8"
          icon="mdi-message-off-outline"
        />
        <p class="font-bold text-lg text-gray-400">
          暂时没有消息
        </p>
      </div>
    </div>
    <!-- actions -->
    <div
      id="message-card-action"
      class="p-2 border-t flex justify-end items-center"
    >
      <v-btn
        variant="flat"
        append-icon="mdi-arrow-right-bold"
        @click="$router.push('/personal/message')"
      >
        查看更多
      </v-btn>
    </div>
  </div>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <v-card
      color="white"
    >
      <!-- title -->
      <div class="m-4 mb-0 flex justify-between items-center">
        <!-- user info -->
        <div class="flex items-center">
          <v-avatar 
            id="avatar"
            class="cursor-pointer"
            size="32"
          >
            <v-img
              lazy-src="/default.jpg"
              :src="targetMessage.sender.avatar"
              cover
              alt="用户头像"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  />
                </div>
              </template>
            </v-img>
          </v-avatar>
          <span class="text-gray-500 ml-2 text-lg">
            {{ targetMessage.sender.name }}
          </span>
        </div>
        <!-- close icon -->
        <v-icon
          icon="mdi-close"
          @click="handleMessageClose"
        />
      </div>
      <v-card-text>
        <p class="font-bold text-lg">
          {{ targetMessage.title }}
          <span
            v-if="targetMessage.typeId === typeCorrectId && targetMessage.isRead"
            class="font-bold text-green-600"
          >
            (作业已批改)
          </span>
        </p>
        <p
          class="mt-2 whitespace-pre-wrap"
          v-text="targetMessage.content"
        />
        <p class="text-sm mt-4 mb-2 text-gray-500">
          发送日期：{{ sendDate }}
        </p>
      </v-card-text>
      <v-card-actions v-if="targetMessage.typeId === typeCorrectId && !targetMessage.isRead">
        <v-btn
          variant="flat"
          class="ms-auto"
          text="前往批改作业"
          @click="handleMessageToCorrect"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getMessageList, receiveOneMessage } from '@/api/message';
import { useUserStore } from '@/store/user';
import MessageType from '@/utils/message-type';

export default {
  name: 'TheMessageListCard',
  data: () => ({
    userStore: useUserStore(),
    typeCorrectId: MessageType.CORRECT.id,
    messageList: [],
    targetMessage: {},
    dialog: false,
    loading: false
  }),
  computed: {
    user() {
      return this.userStore.userInfo;
    },
    sendDate() {
      return this.targetMessage.date.replace('T', ' ');
    }
  },
  created() {
    this.loadMessages();
  },
  methods: {
    handleMessageCardClick(message) {
      this.targetMessage = message;
      this.dialog = true;
    },
    handleMessageClose() {
      this.dialog = false;
      if (this.targetMessage.typeId === this.typeCorrectId) {
        return;
      }
      const targetId = this.targetMessage.id;
      receiveOneMessage(targetId).then(() => {
        this.targetMessage.isRead = true;
      });
    },
    handleMessageToCorrect() {
      this.$router.push(`/teacher/correct/${this.targetMessage.id}`);
    },
    async loadMessages() {
      this.loading = true;
      const res = await getMessageList();
      if (res) {
        this.messageList = res.data.list;
      } else {
        mitt.emit('showToast', { title: '获取消息列表失败', color: 'error', icon: '$error' });
      }
      this.loading = false;
    }
  },
};
</script>

<style>
#message-card-action {
  background-color: var(--custom-background);
}
</style>