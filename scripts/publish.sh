#!/usr/bin/env bash

npmjs=https://registry.npmjs.org/
origin=$(npm config get registry) # 原仓库镜像

echo "原仓库镜像为 $origin"
printf '\t\n'

function setNpmjs(){
  if [[ "$npmjs" != "$origin" ]]; then
    npm config set registry="$npmjs"
    # npm config get registry 会先去检验 npm_config_registry变量
    # 存在的话会先读取，而 npm run 会用启动时的设置初始化一堆 npm_config_*
    # 所以要在这里重新设置一下环境变量
    npm_config_registry="$npmjs" 
    echo "已将仓库镜像设置为 $npmjs"
    printf '\t\n'
  fi
}

function compile(){
  echo "-------开始编译-------"
  printf '\t\n'
  npm run compile
  echo "-------结束编译-------"
  printf '\t\n'
}

function restore(){
  # 设置为原仓库镜像
  if [[ "$npmjs" != "$origin" ]]; then
    npm config set registry="$origin"
    npm_config_registry="$origin"
    echo "已还原仓库镜像为 $origin"
  fi
}

function isLogin(){
  # 是否已经登陆
  current=$(npm whoami 2>/dev/null)
  if [[ ! "$current" ]]; then
    echo '请先进行登录相关操作：npm login'
    restore
    exit 0
  else
    echo "当前已登陆：$current"
    printf '\t\n'
  fi
}

function publish(){
  echo "-------开始发布-------"
  printf '\t\n'
  npm publish
  echo "-------发布完成-------"
  printf '\t\n'
}

# step1: 设置 npmjs 镜像
setNpmjs

# step2: 编译文件
compile

# step3: 判断是否已经登陆npm
isLogin

# step4: 开始发布
publish

# step5: 还原仓库镜像
restore

exit 0