package com.example.openapi;

import com.example.openapi.model.CalendarOption;
import com.example.openapi.model.ClimateDetail;
import com.example.openapi.model.HicriMonthID;
import com.example.openapi.repository.ClimateDetailRepository;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.FileInputStream;
import java.io.IOException;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SeleniumTest {

    @Value("${geckodriver.path}")
    private String driverPath;

    @Value("${sheets.path}")
    private String SHEETS_PATH;

    @Autowired
    private ClimateDetailRepository repository;

    private String HICRI_DAY = "25";
    private String HICRI_YEAR = "1219";
    private static final String CALENDAR_CODE = CalendarOption.HICRI.getCode();
    private HicriMonthID HICRI_MONTH_CODE;

    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.gecko.driver", driverPath);
        driver = new FirefoxDriver();
    }

    @Test
    public void test() {
        readExcel();
    }

    private void callWebsite() {
        driver.get("http://193.255.138.133/takvim.asp");

        WebElement convertButton = driver.findElement(By.xpath("//input[@value='ÇEVİR']"));
        WebElement dayArea = driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[1]/input"));
        WebElement yearArea = driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[3]/input"));
        Select monthSelect = new Select(driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[2]/td[2]/select")));
        Select calendarSelect = new Select(driver.findElement(By.xpath("/html/body/center/form/table[1]/tbody/tr[3]/td[1]/select")));

        dayArea.sendKeys(HICRI_DAY);
        yearArea.sendKeys(HICRI_YEAR);

        calendarSelect.selectByValue(CALENDAR_CODE);

        monthSelect.selectByValue(HICRI_MONTH_CODE.getValue());

        convertButton.click();

        String toMiladiDay = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[2]/td[1]")).getText();
        String toMiladiMonth = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[3]/td[1]")).getText();
        String toMiladiYear = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[4]/td[1]")).getText();
        String toMiladiDayName = driver.findElement(By.xpath("/html/body/center/form/table[2]/tbody/tr[5]/td[2]")).getText();

        System.out.println();
        System.out.println();
        System.out.println("------------------------------");
        System.out.println(toMiladiDay + " " + toMiladiMonth + " " + toMiladiYear + " / " + toMiladiDayName);
        System.out.println("------------------------------");
    }

    private void readExcel() {
        try {
            FileInputStream file = new FileInputStream(SHEETS_PATH);
            ZipSecureFile.setMinInflateRatio(-1.0d);
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            // Retrieving the number of sheets in the Workbook
            System.out.println("Workbook has " + workbook.getNumberOfSheets() + " Sheets : ");

        /*
           =============================================================
           Iterating over all the sheets in the workbook (Multiple ways)
           =============================================================
        */

            // 1. You can obtain a sheetIterator and iterate over it
            System.out.println("Retrieving Sheets using Iterator");

            Sheet sheet  = workbook.getSheetAt(0); // Get Your Sheet.

            System.out.println("number of rows : " + sheet.getLastRowNum());
            int index = 0;
            for (Row row : sheet) { // For each Row.
                if (index == 0) {
                    index++;
                    continue;
                }
                DataFormatter formatter = new DataFormatter();
                Cell dateCell = row.getCell(0); // Get the Cell at the Index / Column you want.
                String textCell = formatter.formatCellValue(row.getCell(1)); // Get the Cell at the Index / Column you want.
                String placeCell = formatter.formatCellValue(row.getCell(2)); // Get the Cell at the Index / Column you want.
                String pageNumberCell = formatter.formatCellValue(row.getCell(3));
                String bookNameCell = formatter.formatCellValue(row.getCell(4)); // Get the Cell at the Index / Column you want.
                String authorCell = formatter.formatCellValue(row.getCell(5)); // Get the Cell at the Index / Column you want.
                String publishedByCell = formatter.formatCellValue(row.getCell(6)); // Get the Cell at the Index / Column you want.
                String publishedDateCell = formatter.formatCellValue(row.getCell(7)); // Get the Cell at the Index / Column you want.

                String[] date;

                try {
                     date = dateCell.getStringCellValue().split("-");
                } catch (NullPointerException e) {
                    // EOF
                    break;
                }

                String year = date[0];
                String month = date[1];
                String day = date[2];
                boolean isHicriYear = true;

                HICRI_MONTH_CODE = HicriMonthID.valueOfCode(month);

                if (HICRI_MONTH_CODE == null) {
                    isHicriYear = false;
                    System.out.println("+++");
                    System.out.println(year + " " + month + " " + day);
                    System.out.println("verilen tarih miladi bir tarih");
                }

                if (isHicriYear && (!year.equals("?") && !day.equals("?"))) {
                    HICRI_YEAR = year;
                    HICRI_DAY = day;
                    callWebsite();
                } else {

                    System.out.println();
                    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    System.out.println(year + " " + month + " " + day);
                    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                }


                ClimateDetail climateDetail = ClimateDetail.builder()
                        .author(authorCell)
                        .bookName(bookNameCell)
                        .pageNumber(pageNumberCell)
                        .place(placeCell)
                        .publishedBy(publishedByCell)
                        .publishedDate(publishedDateCell)
                        .text(textCell).build();

                repository.save(climateDetail);

                index++;

            }

            // Closing the workbook
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}