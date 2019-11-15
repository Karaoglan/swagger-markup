package com.example.openapi;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SeleniumTest {

    @Value("${geckodriver.path}")
    private String driverPath;

    public static final String HICRI_DAY = "25";
    public static final String HICRI_YEAR = "1219";
    public static final String CALENDAR_CODE = CalendarOption.HICRI.getCode();
    public static final String HICRI_MONTH_CODE = HicriMonthID.ZILHICCE.getCode();

    private WebDriver driver;

    @Before
    public void setUp() throws Exception {
        System.setProperty("webdriver.gecko.driver", driverPath);
        driver = new FirefoxDriver();
    }

    @Test
    public void testTest() throws Exception {
        driver.get("http://193.255.138.133/takvim.asp");

        WebElement convertButton = driver.findElement(By.xpath("//input[@value='ÇEVİR']"));
        WebElement dayArea = driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[1]/input"));
        WebElement yearArea = driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[3]/input"));
        Select monthSelect = new Select(driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[2]/select")));
        Select calendarSelect = new Select(driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[3]/td[1]/select")));

        dayArea.sendKeys(HICRI_DAY);
        yearArea.sendKeys(HICRI_YEAR);

        calendarSelect.selectByValue(CALENDAR_CODE);

        monthSelect.selectByValue(HICRI_MONTH_CODE);

        convertButton.click();

        String toMiladiDay = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[2]/td[1]")).getText();
        String toMiladiMonth = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[3]/td[1]")).getText();
        String toMiladiYear = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[4]/td[1]")).getText();
        String toMiladiDayName = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[5]/td[2]")).getText();

        System.out.println();
        System.out.println();
        System.out.println();
        System.out.println("------------------------------");
        System.out.println(toMiladiDay + " " + toMiladiMonth + " " + toMiladiYear + " / " + toMiladiDayName);
        System.out.println("------------------------------");

    }
}