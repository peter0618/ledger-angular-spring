package com.example.ledgerangularspring.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class TimeUtil {
    private static final String UTC_DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    private static final String YYYY_MM_DD_FORMAT = "yyyy-MM-dd";
    private static final String TIME_ZONE_UTC = "UTC";

    /**
     * UTC dateTime format 을 YYYY-MM-DD 로 변환해줍니다.
     * @param utcDateTimeFormat
     * @return
     */
    public static String utcToMysql(String utcDateTimeFormat) throws Exception {
        SimpleDateFormat inputFormat = new SimpleDateFormat(UTC_DATETIME_FORMAT);
        inputFormat.setTimeZone(TimeZone.getTimeZone(TIME_ZONE_UTC));
        Date date = inputFormat.parse(utcDateTimeFormat);   // 2020-08-09T15:00:00.000Z 포맷을 파싱 => Mon Aug 10 00:00:00 KST 2020
        SimpleDateFormat YMDFormat = new SimpleDateFormat(YYYY_MM_DD_FORMAT);
        return YMDFormat.format(date);                      // Mon Aug 10 00:00:00 KST 2020 => 2020-08-10
    }
}
