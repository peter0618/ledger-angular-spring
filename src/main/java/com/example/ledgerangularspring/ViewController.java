package com.example.ledgerangularspring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    // 아래와 같이 mapping 부분에 angular router 를 추가하면, 브라우저에서 해당 url을 직접 입력하고 들어갈 때 에러가 나지 않습니다.
    @RequestMapping({"/ledger"})
    public String index() {
        return "forward:/index.html";
    }
}
