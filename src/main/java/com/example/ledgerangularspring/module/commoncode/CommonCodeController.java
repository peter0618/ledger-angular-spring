package com.example.ledgerangularspring.module.commoncode;

import com.example.ledgerangularspring.model.wrapper.ListResponseWrapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/common-codes")
@RestController
public class CommonCodeController {

    private CommonCodeService commonCodeService;

    public CommonCodeController(CommonCodeService commonCodeService) {
        this.commonCodeService = commonCodeService;
    }

    /**
     * 구분코드(div-code)에 해당하는 공통코드 목록을 조회합니다.
     * @param divCode
     * @return
     */
    @GetMapping("/{divCode}")
    public ListResponseWrapper selectCommonCodes(@PathVariable("divCode") String divCode){
        System.out.println("selectCommonCodes(divCode : " + divCode + ")");
        return this.commonCodeService.selectCommonCodes(divCode);
    }
}
