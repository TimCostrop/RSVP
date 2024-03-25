package be.costrop.rsvp;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;

public class GenerateQrCodeInTest {
	private static final int SIZE = 100;

	@Test
	void shouldIWantAQrCode_generateOne() {
		final var qrCodeContent = "https://tim-en-laura-anne-trouwen.be";

		System.out.println("Encoding QR code with following content " + qrCodeContent);

		final var qrCodeWriter = new QRCodeWriter();

		try {
			final var bitMatrix = qrCodeWriter.encode(qrCodeContent, BarcodeFormat.QR_CODE, SIZE, SIZE);
			final var image = new BufferedImage(SIZE, SIZE, BufferedImage.TYPE_INT_ARGB);
			for (int i = 0; i < SIZE; i++) {
				for (int j = 0; j < SIZE; j++) {
					image.setRGB(i, j, bitMatrix.get(i, j) ? Color.BLACK.getRGB() : Color.TRANSLUCENT);
				}
			}
			final var outStream = new FileOutputStream("target/qr.png");
			ImageIO.write(image, "png", outStream);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
