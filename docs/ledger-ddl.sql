-- 회계장부 마스터 테이블 생성 DDL
CREATE TABLE `ledger_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '유일식별자',
  `stnd_date` date NOT NULL COMMENT '기준일자',
  `item_code` varchar(2) NOT NULL COMMENT '항목코드',
  `note` VARCHAR(200) DEFAULT NULL COMMENT '비고',
  `income` int(11) unsigned DEFAULT 0 COMMENT '수입',
  `expenditure` int(11) unsigned DEFAULT 0 COMMENT '지출',
  `balance` int(11) unsigned DEFAULT 0 COMMENT '잔액',
  PRIMARY KEY (`id`) USING BTREE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회계장부_마스터 테이블';

-- 공통 코드 테이블 생성 DDL
CREATE TABLE `common_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '유일식별자',
  `div_code` varchar(10) NOT NULL COMMENT '업무구분코드',
  `div_code_name` varchar(100) NOT NULL COMMENT '업무구분코드명',
  `dtl_code` varchar(2) NOT NULL COMMENT '상세코드',
  `dtl_code_name` varchar(100) NOT NULL COMMENT '상세코드명',
  `note` varchar(100) DEFAULT NULL COMMENT '비고',
  PRIMARY KEY (`id`) USING BTREE
)  ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='공통코드 테이블'
;