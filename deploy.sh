# 发生任何错误时终止
set -e

# 构建
npm run build-only

# 进入输出产物文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

git remote add origin git@github.com:Stargazer777777/gpt-professor.git
git branch -m page

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f origin page

cd -
