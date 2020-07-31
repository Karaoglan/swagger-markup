package com.example.openapi.service;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.HeaderParameter;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class Config {
    @Bean
    public OpenAPI customOpenApi() {
        Contact contact = new Contact();
        contact.setEmail("burakkaraoglan@icloud.com");
        contact.setName("Karaoglan");
        contact.setUrl("http://burakkaraoglan.com");

        SecurityScheme scheme = new SecurityScheme()
            .type(SecurityScheme.Type.APIKEY)
            .description("API KEY Auth via JWT")
            .in(SecurityScheme.In.HEADER)
            .name("Authorization");

        Components components = new Components()
            .addSecuritySchemes("api_key", scheme)
            .addParameters(
                "client_ip",
                new HeaderParameter()
                .required(true)
                .name("client_ip")
                .schema(new StringSchema()._default("128.0.0.2"))
            );

        return new OpenAPI()
            .components(components)
            .security(Arrays.asList(new SecurityRequirement().addList("api_key")))
            .info(new Info()
                .title("Deneme Api")
                .description("This is description of an API")
                .contact(contact)
                .version(getClass().getPackage().getImplementationVersion() != null ?
                    getClass().getPackage().getImplementationVersion() : "-")
            );
    }
}
