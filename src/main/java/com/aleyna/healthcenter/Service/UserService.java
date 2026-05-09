package com.aleyna.healthcenter.Service;
import com.aleyna.healthcenter.Entity.PreRegistration;
import com.aleyna.healthcenter.Entity.User;
import com.aleyna.healthcenter.Repository.PreRegistrationRepository;
import com.aleyna.healthcenter.Repository.RoleRepository;
import com.aleyna.healthcenter.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aleyna.healthcenter.Entity.Role;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PreRegistrationRepository preRegistrationRepository;
    public String giris(String tcNo, String sifre) {
        User kullanici = userRepository.findByTcNoAndSifre(tcNo, sifre);
        if (kullanici == null) {
            return "TC no veya şifre hatalı";
        }
        else if (kullanici.getRolAdi().getRol().equals("DOKTOR")) {
            return "doktor_paneli";
        } else if (kullanici.getRolAdi().getRol().equals("HASTA")) {
            return "hasta_paneli";
        } else {
            return "eczacı_paneli";
        }
    }
    public String kayit(String tcNo,String sifre){
        PreRegistration kullanici=preRegistrationRepository.findByTcNo(tcNo);
        User arama=userRepository.findByTcNo(tcNo);
        if(kullanici==null){
            return "eklenecek kullanici bulunamadi";
        }
        else {
            if(arama!=null)
            {
                return "tcNo'ya sahip kayıt var";
            }
            else{
                User yeniKullanici=new User();
                yeniKullanici.setTcNo(tcNo);
                yeniKullanici.setSifre(sifre);
                yeniKullanici.setRolAdi(kullanici.getRolId());
                userRepository.save(yeniKullanici);
                return "kayit olusturuldu";
            }
        }
    }
    public String sifreGuncelle(String tcNo,String sifre,String yeniSifre ){
        User kullanici=userRepository.findByTcNoAndSifre(tcNo,sifre);
        if(kullanici==null){
            return "kullanici adi veya sifre hatali.";
        }
        else{
            kullanici.setSifre(yeniSifre);
            userRepository.save(kullanici);
            return "sifre guncellendi.";
        }
    }
}
