# 로그 메시지 출력
echo "> FE 배포 시작"

# 배포할 경로 설정
REPOSITORY=/home/ubuntu/fortune_fe
ZIP_FILE=/home/ubuntu/build-fe.zip

# 기존 애플리케이션 정리
echo "> 기존 dist 폴더 제거"
rm -rf $REPOSITORY/dist

# S3에서 다운로드된 zip 파일 압축 해제
echo "> 새로운 배포 파일 압축 해제"
unzip $ZIP_FILE -d $REPOSITORY

# 권한 설정
echo "> dist 폴더 권한 설정"
chown -R www-data:www-data $REPOSITORY/dist
chmod -R 755 $REPOSITORY/dist

# Nginx 재시작
echo "> Nginx 재시작"
sudo systemctl restart nginx

# 로그 출력
echo "> FE 배포 완료"
