package com.example.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//
//	 @Query(nativeQuery = true, value = "SELECT COUNT(u) > 0 FROM user u WHERE u.username = :username AND u.password = :password")
//	 boolean findUser(@Param("email") String email, @Param("password") String password);
//	
    Optional<User> findByEmail(String email);

    Optional<User> findByMobileNumber(String mobileNumber);
}
