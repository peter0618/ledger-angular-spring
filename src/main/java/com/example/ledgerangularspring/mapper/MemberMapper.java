package com.example.ledgerangularspring.mapper;

import com.example.ledgerangularspring.domain.MemberVO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface MemberMapper {

    @Insert("insert into tbl_member (userid, userpw, username, email) values (#{userid}, #{userpw}, #{username}, #{email}) ")
    void create(MemberVO vo) throws Exception;

    MemberVO read(@Param("userid") String userid) throws Exception;
}
