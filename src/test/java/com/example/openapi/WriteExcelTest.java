package com.example.openapi;

import com.example.openapi.model.ClimateDetail;
import com.example.openapi.repository.ClimateDetailRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WriteExcelTest {

    @Autowired
    private ClimateDetailRepository repository;

    @Value("${sheets.path}")
    private String SHEETS_PATH;

    @Test
    public void writeToExcel() {
        List<ClimateDetail> climates =
            repository.findByTextContainingIgnoreCaseOrWeatherTagsContainingIgnoreCaseOrderByDateAsc("veba", "veba");

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Veba Verileri");

        createHeaderRow(sheet);

        int rowCount = 0;

        for (ClimateDetail climate : climates) {
            Row row = sheet.createRow(++rowCount);
            writeClimate(climate, row);
        }

        try (FileOutputStream outputStream = new FileOutputStream(SHEETS_PATH + "/" + "vebaveri.xls")) {
            workbook.write(outputStream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void writeClimate(ClimateDetail climateDetail, Row row) {
        Cell cell = row.createCell(0);
        cell.setCellValue(climateDetail.getDate() + "(" + climateDetail.getOriginalDate() + ")");

        cell = row.createCell(1);
        cell.setCellValue(climateDetail.getText());

        cell = row.createCell(2);
        cell.setCellValue(climateDetail.getPlace());

        cell = row.createCell(3);
        cell.setCellValue(climateDetail.getPageNumber());

        cell = row.createCell(4);
        cell.setCellValue(climateDetail.getBookName());

        cell = row.createCell(5);
        cell.setCellValue(climateDetail.getAuthor());

        cell = row.createCell(6);
        cell.setCellValue(climateDetail.getPublishedBy());

        cell = row.createCell(7);
        cell.setCellValue(climateDetail.getPublishedDate());

        cell = row.createCell(8);
        cell.setCellValue(climateDetail.getWeatherTags());
    }

    private void createHeaderRow(Sheet sheet) {

        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        Font font = sheet.getWorkbook().createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 14);
        cellStyle.setFont(font);

        Row row = sheet.createRow(0);
        Cell dateCell = row.createCell(0);

        dateCell.setCellStyle(cellStyle);
        dateCell.setCellValue("Tarih(Yıl-Ay-Gün");

        Cell textCell = row.createCell(1);
        textCell.setCellStyle(cellStyle);
        textCell.setCellValue("Metin");

        Cell placeCell = row.createCell(2);
        placeCell.setCellStyle(cellStyle);
        placeCell.setCellValue("Yer");

        Cell pageNumberCell = row.createCell(3);
        pageNumberCell.setCellStyle(cellStyle);
        pageNumberCell.setCellValue("Sayfa");

        Cell bookNameCell = row.createCell(4);
        bookNameCell.setCellStyle(cellStyle);
        bookNameCell.setCellValue("Kitap Adı");

        Cell authorCell = row.createCell(5);
        authorCell.setCellStyle(cellStyle);
        authorCell.setCellValue("Yazar");

        Cell publisherCell = row.createCell(6);
        publisherCell.setCellStyle(cellStyle);
        publisherCell.setCellValue("Yayın evi");

        Cell publishDateCell = row.createCell(7);
        publishDateCell.setCellStyle(cellStyle);
        publishDateCell.setCellValue("Yayın Yılı");

        Cell weatherTagsCell = row.createCell(8);
        weatherTagsCell.setCellStyle(cellStyle);
        weatherTagsCell.setCellValue("Etiket");
    }
}
