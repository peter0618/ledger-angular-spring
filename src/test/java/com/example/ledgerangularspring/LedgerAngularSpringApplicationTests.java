package com.example.ledgerangularspring;

import com.example.ledgerangularspring.domain.MemberVO;
import com.example.ledgerangularspring.mapper.MemberMapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;
import java.sql.Connection;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LedgerAngularSpringApplicationTests {

	@Autowired
	private DataSource ds;

	@Autowired
	private SqlSessionFactory sqlSession;

	@Autowired
	private MemberMapper mapper;

	@Test
	public void contextLoads() {
	}

	@Test
	public void testConnection() throws Exception {

		System.out.println(ds);

		Connection con = ds.getConnection();

		System.out.println(con);

		con.close();
	}

	@Test
	public void testSqlSession() throws Exception {
		System.out.println(sqlSession);
	}

	@Test
	public void testInsert() throws Exception {

		MemberVO vo = new MemberVO();

		vo.setUserid("user543");
		vo.setUserpw("user543");
		vo.setUsername("Peter Choi");
		vo.setEmail("cbj0618@gmail.com");

		mapper.create(vo);
	}

	@Test
	public void testRead() throws Exception {
		MemberVO vo = mapper.read("user543");
		System.out.println(vo.toString());
	}


}
