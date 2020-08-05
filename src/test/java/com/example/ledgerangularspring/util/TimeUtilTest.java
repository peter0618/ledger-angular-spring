package com.example.ledgerangularspring.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TimeUtilTest {

  /**
   * 프론트앤드에서 ledger data insert 를 요청할 때 UTC 형태로 전달해주므로 UTC 를 다시 한국 기준 시각으로 계산해줘야 합니다.
   */
  @Test
  void utcToMysqlTest() throws Exception {
    String testUtcDateFormat = "2020-08-09T15:00:00.000Z";  // 프론트앤드에서 ledger 요청시 사용되는 DateTime Format
    assertEquals("2020-08-10",TimeUtil.utcToMysql(testUtcDateFormat));
  }
}