package com.bubblebooks.bubblebooks.mappers;
import com.bubblebooks.bubblebooks.dto.Logindto;
import com.bubblebooks.bubblebooks.models.User;

public class UserMap {
    
    public static void LogintoUser (Logindto loginDto, User user) {
        user.setUsername(loginDto.getUsername());
        user.setPassword(loginDto.getPassword());
        
    }
}
