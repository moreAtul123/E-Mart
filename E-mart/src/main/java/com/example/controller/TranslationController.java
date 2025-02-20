package com.example.controller;


import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TranslationController {
    private final MessageSource messageSource;

    public TranslationController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/api/translations")
    public Map<String, String> getTranslations(@RequestParam(defaultValue = "en") String lang) {
        Locale locale = new Locale(lang);

        String[] keys = { "home", "products", "categories", "orders", "contact", "logout" };
        return Map.ofEntries(
            Map.entry("home", messageSource.getMessage("home", null, locale)),
            Map.entry("products", messageSource.getMessage("products", null, locale)),
            Map.entry("categories", messageSource.getMessage("categories", null, locale)),
            Map.entry("orders", messageSource.getMessage("orders", null, locale)),
            Map.entry("contact", messageSource.getMessage("contact", null, locale)),
            Map.entry("logout", messageSource.getMessage("logout", null, locale))
        );
    }
}