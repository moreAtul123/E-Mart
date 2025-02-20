package com.example.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.JwtResponse;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.security.JwtUtil;
import com.example.service.CustomUserDetailsService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class JwtController 
{
	
	@Autowired
	private JwtUtil jwtutil;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private CustomUserDetailsService customuserdetailsservice;
	
	//@PostMapping("/public/token")
//	public ResponseEntity<?> generateToken(@RequestBody User myuser)
//	{
//		try
//		{
//		System.out.println("inside token method");
//		System.out.println(myuser);
//		 boolean result = repository.findUser(myuser.getUsername(), myuser.getPassword());
//
//	        if (!result) {
//	            throw new UsernameNotFoundException("Credentials don't match");
//	        }
//		customuserdetailsservice.setPassword(myuser.getPassword());
//		UserDetails userdetails=customuserdetailsservice.loadUserByUsername(myuser.getUsername());
//		String token=this.jwtutil.generateToken(userdetails);
//		System.out.println("JWT "+token);
//		return ResponseEntity.ok(new JwtResponse(token));
//		}
//		catch(Exception ee)
//		{
//			ee.printStackTrace();
//			return null;
//		}
//	}
}
