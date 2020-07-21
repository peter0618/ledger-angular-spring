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