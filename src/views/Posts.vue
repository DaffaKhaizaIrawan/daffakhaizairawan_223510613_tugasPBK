<template>
  <div v-if="activeTab === 'posts'">
    <h2>Postingan</h2>
    <select v-model="selectedUser" @change="getPosts">
      <option value="" disabled selected>Pilih User</option>
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <ul>
      <li v-for="(post, index) in posts" :key="post.id">
        <h3>{{ index + 1 }}. <strong>{{ post.title }}</strong></h3>
        <p>{{ post.body }}</p><br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    activeTab: 'posts',
    users: [],
    posts: [],
    todos: [],
    selectedUser: null
  };
},
created() {
  this.getUsers();
},
methods: {
  async getUsers() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.users = response.data;
    } catch (error) {
      console.error('Gagal mengambil data user:', error);
    }
  },
  async getPosts() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
      this.posts = response.data;
    } catch (error) {
      console.error('Gagal mengambil data postingan:', error);
    }
  },
  showPosts() {
    this.activeTab = 'posts';
    this.getPosts();
  },
}
};
</script>

<style>
#app {
font-family: Arial, sans-serif;
max-width: 800px;
margin: 0 auto;
padding: 20px;
}

header {
text-align: center;
margin-bottom: 20px;
}

button, .todos-link {
background-color: #007bff;
color: #fff;
border: none;
border-radius: 4px;
padding: 10px 20px;
cursor: pointer;
transition: background-color 0.3s;
margin-right: 10px;
}

button:last-child {
margin-right: 0;
}

button:hover, .todos-link:hover {
background-color: #0056b3;
}

.tab-content {
border: 1px solid #ccc;
border-radius: 8px;
padding: 20px;
margin-bottom: 20px;
}

.user-select {
margin-bottom: 10px;
}

.post-list {
list-style: none;
padding: 0;
}

.post-item {
margin-bottom: 20px;
}

.post-item h3 {
font-size: 24px;
margin-bottom: 10px;
}

.post-item p {
font-size: 16px;
line-height: 1.6;
}

header {
display: flex;
justify-content: center;
}

</style>