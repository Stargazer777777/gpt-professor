import{d as p,b as r,P as n,c as s,o as i}from"./index-7bab1c5f.js";const u=p({__name:"help",setup(m){const e=r(`# 帮助手册

## 关于

这只是一个静态页面，所有的api均来自于openai，该系统不会收集和盗取您的apiKey。

### 仓库地址

这是一个开源项目，如果你想了解具体的实现，请前往仓库[Stargazer777777/gpt-professor: better than chatgpt (github.com)](https://github.com/Stargazer777777/gpt-professor)

### 特点

1. 支持手动修改各种选项和参数，达到满意的效果。
2. 支持修改上下文，让你左右之前你说过的话和ai说的话
3. 支持gpt-4，需要自己去申请



## 教程

### 总体

#### 在哪填写apiKey和organization

右上角齿轮

#### 选项

这个可以去openAI官网了解，上面有清楚的描述。

[Overview - OpenAI API](https://platform.openai.com/overview)

### chat

#### 上下文操作

##### 开关每条消息

决定每条消息是否被添加到上下文

##### 编辑上下文

三个单选框可以实现对上下文的编辑

#### 新对话

由于没有保存功能，新对话将清空所有信息

#### 根据启用的信息生成

根据现有的启用的上下文生成新的ai消息



## 后续

将实现图片生成，图片输入等功能



## 反馈

如果你发现了任何bug，发送到邮箱：1809456119@qq.com，我会尽快解决`);return(l,o)=>{const t=n("v-md-editor");return i(),s(t,{mode:"preview",modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=a=>e.value=a)},null,8,["modelValue"])}}});export{u as default};
