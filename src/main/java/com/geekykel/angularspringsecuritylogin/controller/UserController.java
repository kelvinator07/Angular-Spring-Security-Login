package com.geekykel.angularspringsecuritylogin.controller;

import com.geekykel.angularspringsecuritylogin.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {
        return user.getUserName().equals("user") && user.getPassword().equals("password");
    }

    public Principal user(HttpServletRequest request) {
        String authToken= request.getHeader("Authorization").substring("Basic".length()).trim();

        return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
    }
}
