# Description

교회회계장부를 관리하는 프로그램입니다.

# Configurations

이 application 을 실행하기 위해 필요한 설정입니다.

src/main/resources/application.properties 파일에 아래와 같이 몇가지 변수를 셋팅하면 DB 연동 및 mybatis mapper가 설정 됩니다.

```bash
spring.datasource.url=jdbc:mysql://localhost:3307/springboot?useSSL=false
spring.datasource.username=root
spring.datasource.password=toor
mybatis.mapper-locations=classpath:/mappers/*.xml
```
# Getting started

## Run

#### frontend
```bash
# localhost:4200에 프론트앤드 dev server를 띄웁니다.
# proxy.conf.json 파일 설정을 따라 동작합니다.
src/main/frontend/npm run start:proxy
```

#### backend
IDE에서 바로 실행(localhost:8080)하면 frontend 와 연결 됩니다.

### TODO LIST
1) /ledger 화면의 기본적인 CRUD 작성
2) DB에 월별 회계 row 순서 컬럼 추가 및 프론트/백앤드 반영 (o)
3) /ledger 화면을 월별로 라우팅할 수 있도록 변경 (o)

 