package com.aleyna.healthcenter.Controller;
import com.aleyna.healthcenter.Entity.Role;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public String giris (@RequestParam String tcNo,@RequestParam String sifre)
    {
        return userService.giris(tcNo,sifre);
    }

    @PostMapping("/kayit")
    public String kayit(@RequestParam String tcNo,@RequestParam String sifre)
    {
        return userService.kayit(tcNo,sifre);
    }

    @PutMapping("/guncelle")
    public String guncelle(@RequestParam String tcNo,@RequestParam String sifre,@RequestParam String yeniSifre){
        return userService.sifreGuncelle(tcNo,sifre,yeniSifre);
    }
}
