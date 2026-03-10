<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import Base from './components/base/index.vue'
import List from './components/list/index.vue'
import { resumeSchema, type THeaders, type TEduExperience } from './schemas'

type TEduExperienceList = TEduExperience[]

const headers = ref<THeaders>({
  eduExperience: '教育经历',
  devAbilities: '开发能力',
  jobExperience: '职业经历',
  projectExperience: '项目经历',
  // Award Experience
  awardExperience: '获奖经历',
  researchExperience: '科研经历',
})

const isChanging = ref(false)

const name = ref('刘哲闰')

const tel = ref('19883739397')
const telHref = computed(() => `tel:${tel.value}`)

const email = ref('rrrico@foxmail.com')
const emailHref = computed(() => `mailto:${email.value}`)

const github = ref('zherunliu')
const githubHref = computed(() => `https://github.com/${github.value}`)

const myInfo = ref('女, 24, 硕士, 前端/全栈工程师')

const eduExperienceList = ref<TEduExperienceList>([
  ['高中: 2016-2019', '衡阳市第八中学', '理科'],
  ['本科: 2019-2023', '温州大学', '数据科学与大数据技术'],
  ['硕士: 2023-2026', '南京邮电大学', '人工智能'],
])

const devAbilitiesList = ref<string[]>([
  '了解大模型的多模态, 提示词增强, 会话记忆, 结构化输出, 检索增强生成 (RAG), 文档切割/向量化, 相似度搜索, topK 最相关文档切片, mcp 模型上下文协议, mcp 工具调用与开发, 大模型护轨 (guardrail), SSE 流式响应',
  '熟悉 CSS, 熟悉 CSS 预处理器, 模块化, 原子化',
  '熟悉 python、js/ts, 持续学习 AI、前端技术',
  '熟悉 Vue3, Pinia, vue-router, 了解 Vue3 响应式原理',
  '熟悉数据结构, 计算机网络, 设计模式',
  '熟悉 Git, CI/CD, 有良好的代码风格',
  '熟悉 Vite, 了解 Webpack',
  '了解 Web 性能指标, 性能优化',
  '了解 Node.js, 了解 Express.js, Nest.js',
  '了解 MySQL, Redis 等后端技术栈',
  '了解 JSX/TSX, 了解 React, React Fiber 架构',
])

const jobExperienceList = ref<string[]>([
  '江苏 WIC 创新中心: 2025-06 ~ 2025-08, 前端 AI 实习生; 前端使用 Vue3 + Vite, 后端使用 Nest.js',
  '前端 + AI 方面: 负责病虫害 AI 检测算法部署, 包括目标分类、目标检测和进化算法, 确保模型的稳定性; 搭建病虫害 AI 检测算法端到端平台, 支持算法可视化, 提升团队效率; 对于海量的病虫害样本, 使用虚拟滚动列表和图片懒加载提高前端渲染性能; 病虫害的检测结果包含大量专业术语, 对农民朋友不友好, 实习期间为病虫害检测平台接入大模型, 使用 langchain 实现 RAG 功能, 大模型可以检索以往的检测结果作为 RAG 文档, 农民朋友上传病虫害图片后, AI 专家使用通俗易懂的语言向农民朋友解释本次的检测结果并提供科学建议',
  '后端方面: 使用 Nest.js 编写 REST API, 修改传统的使用 EventSource + GET 方法的 SSE 响应，使用 POST 实现',
])

const awardExperienceList = ref<string[]>([
  '南京邮电大学一等奖学金',
  '南京邮电大学优秀研究生',
  '南京邮电大学小米奖学金',
  '连续 3 年温州大学三等奖学金',
])

const projectExperienceList = ref<string[]>([
  '企业级管理平台, 仓库链接: https://github.com/zherunliu/ldv; 技术栈: Vite、Vue3、Axios、Sass、TailwindCSS, Pinia、vue-router, 虚拟滚动列表: 分别使用 @tanstack/vue-virtual 和手写实现; 使用 Prettier、ESLint、Husky、lint-staged 保证代码质量; 使用 Rollup 可视化插件分析打包产物体积; 使用 CI/CD 部署到 github-pages; 性能优化: 缓存组件、虚拟滚动列表; 手写观察者模式的事件总线; 编写 Axios 前置/后置拦截器处理 HTTP 请求/响应错误; 通过 vue-router 前置/后置路由守卫和路由元信息, 实现路由权限控制',
])

const researchExperienceList = ref<string[]>([
  '论文:「基于自适应不确定性度量的离线强化学习算法」北大中文核心期刊',
  '论文:「基于模型的离线-在线强化学习算法」离线强化学习受行为策略限制, 在线强化学习交互开销大, 离线到在线方案有分布偏移问题: 引入定向探索模型, 引导智能体探索高价值和高不确定性的状态动作区域; 为离线到在线不同阶段适配不同的不确定性, 同时纳入动态自适应权重, 实现平滑在线交互; 多环境实验证明, 算法在减少交互步数的同时显著提升策略性能, 优于目前主流方法',
])

const handleContextMenu = () => {
  if (isChanging.value) {
    setLocalStorageResume()
  } else {
    getLocalStorageResume()
  }
  isChanging.value = !isChanging.value
}

const clearLocalStorage = () => localStorage.removeItem('resume')

const getLocalStorageResume = () => {
  const resumeStr = localStorage.getItem('resume')
  if (resumeStr) {
    const res = resumeSchema.safeParse(JSON.parse(resumeStr))
    if (!res.success) {
      console.error('Invalid resume:', res.error)
      return
    }
    const resume = res.data
    headers.value = resume.headers
    name.value = resume.name
    tel.value = resume.tel
    email.value = resume.email
    github.value = resume.github
    myInfo.value = resume.myInfo
    eduExperienceList.value = resume.eduExperienceList
    devAbilitiesList.value = resume.devAbilitiesList
    jobExperienceList.value = resume.jobExperienceList
    projectExperienceList.value = resume.projectExperienceList
    awardExperienceList.value = resume.awardExperienceList
    researchExperienceList.value = resume.researchExperienceList
  }
}

const setLocalStorageResume = () => {
  localStorage.setItem(
    'resume',
    JSON.stringify({
      headers: headers.value,
      name: name.value,
      tel: tel.value,
      email: email.value,
      github: github.value,
      myInfo: myInfo.value,
      eduExperienceList: eduExperienceList.value,
      devAbilitiesList: devAbilitiesList.value,
      jobExperienceList: jobExperienceList.value,
      projectExperienceList: projectExperienceList.value,
      researchExperienceList: researchExperienceList.value,
    }),
  )
}

onUnmounted(setLocalStorageResume)
</script>

<template>
  <div class="flex w-dvw flex-col items-center">
    <template v-if="isChanging">
      <button @click="clearLocalStorage">Clear local storage</button>
      <label @contextmenu.prevent="handleContextMenu" class="cursor-pointer">
        <span class="bg-theme-light rounded px-2"> Right click to save your resume </span>
        <input
          v-model="name"
          @contextmenu.prevent="handleContextMenu"
          placeholder="Input your name"
          class="ml-2"
        />
      </label>
      <label>
        <span class="bg-theme-light rounded px-2">
          Input your gender, age, education, expected job
        </span>
        <input
          v-model="myInfo"
          placeholder="Input your gender, age, education, expected job"
          class="ml-2 w-[25vw]"
        />
      </label>
      <div class="my-2 flex w-[80vw] justify-between gap-2">
        <label>
          Tel
          <input v-model="tel" />
        </label>
        <label>
          Email
          <input v-model="email" />
        </label>
        <label>
          GitHub
          <input v-model="github" />
        </label>
      </div>
    </template>
    <template v-else>
      <h1 @contextmenu.prevent="handleContextMenu" class="my-1 cursor-pointer text-xl">
        {{ name }}
      </h1>
      <p>{{ myInfo }}</p>
      <div class="flex w-[80vw] justify-between gap-2">
        <label>
          Tel
          <a :href="telHref" class="hover:bg-theme-light ml-2 rounded">
            {{ tel }}
          </a>
        </label>
        <label>
          Email
          <a :href="emailHref" class="hover:bg-theme-light ml-2 rounded">
            {{ email }}
          </a>
        </label>
        <label>
          Github
          <a
            :href="githubHref"
            class="hover:bg-theme-light ml-2 rounded"
            target="_blank"
            rel="noopener"
          >
            {{ githubHref }}
          </a>
        </label>
      </div>
    </template>

    <Base>
      <template v-if="isChanging" v-slot:header>
        <input
          :value="headers.eduExperience"
          @change="
            (e: Event) => {
              headers.eduExperience = (e.target as HTMLInputElement).value
            }
          "
          placeholder="Education Experience"
        />
      </template>
      <template v-else v-slot:header>
        {{ headers.eduExperience }}
      </template>

      <template v-if="isChanging">
        <ul>
          <li
            v-for="([fromTo, university, major], idx) of eduExperienceList"
            class="grid grid-cols-4"
            :key="idx"
          >
            <input
              :value="fromTo"
              placeholder="From to"
              @change="(e) => (eduExperienceList[idx][0] = (e.target as HTMLInputElement).value)"
            />

            <input
              :value="university"
              placeholder="University"
              @change="(e) => (eduExperienceList[idx][1] = (e.target as HTMLInputElement).value)"
            />

            <input
              :value="major"
              placeholder="Major"
              @change="(e) => (eduExperienceList[idx][2] = (e.target as HTMLInputElement).value)"
            />

            <div class="flex justify-center">
              <button @click="eduExperienceList.splice(idx, 1)" class="w-20">clear</button>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul>
          <li
            v-for="([fromTo, university, major], idx) of eduExperienceList"
            class="grid grid-cols-3"
            :key="idx"
          >
            <div>{{ fromTo }}</div>
            <div>{{ university }}</div>
            <div>{{ major }}</div>
          </li>
        </ul>
      </template>
    </Base>

    <!-- Development Abilities -->
    <List :isChanging="isChanging" v-model="devAbilitiesList">
      <template v-slot:header>
        <input
          v-if="isChanging"
          :value="headers.devAbilities"
          @change="(e: Event) => (headers.devAbilities = (e.target as HTMLInputElement).value)"
          placeholder="Development Abilities"
        />
        <div v-else>{{ headers.devAbilities }}</div>
      </template>
    </List>

    <!-- Job Experience -->
    <List :isChanging="isChanging" v-model="jobExperienceList">
      <template v-slot:header>
        <input
          v-if="isChanging"
          :value="headers.jobExperience"
          @change="(e: Event) => (headers.jobExperience = (e.target as HTMLInputElement).value)"
          placeholder="Job Experience"
        />
        <div v-else>{{ headers.jobExperience }}</div>
      </template>
    </List>

    <!-- Project Experience -->
    <List :isChanging="isChanging" v-model="projectExperienceList">
      <template v-slot:header>
        <input
          v-if="isChanging"
          :value="headers.projectExperience"
          @change="(e: Event) => (headers.projectExperience = (e.target as HTMLInputElement).value)"
          placeholder="Project Experience"
        />
        <div v-else>{{ headers.projectExperience }}</div>
      </template>
    </List>

    <!-- Award Experience -->
    <List :isChanging="isChanging" v-model="awardExperienceList">
      <template v-slot:header>
        <input
          v-if="isChanging"
          :value="headers.awardExperience"
          @change="(e: Event) => (headers.awardExperience = (e.target as HTMLInputElement).value)"
          placeholder="Award Experience"
        />
        <div v-else>{{ headers.awardExperience }}</div>
      </template>
    </List>

    <!-- Research Experience -->
    <List :isChanging="isChanging" v-model="researchExperienceList">
      <template v-slot:header>
        <input
          v-if="isChanging"
          :value="headers.researchExperience"
          @change="
            (e: Event) => (headers.researchExperience = (e.target as HTMLInputElement).value)
          "
          placeholder="Research Experience"
        />
        <div v-else>{{ headers.researchExperience }}</div>
      </template>
    </List>
  </div>
</template>
