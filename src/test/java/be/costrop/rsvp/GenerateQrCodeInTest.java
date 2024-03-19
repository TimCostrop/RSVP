package be.costrop.rsvp;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.io.File;

public class GenerateQrCodeInTest {
	@Test
	void shouldIWantAQrCode_generateOne() {
		final var qrCodeContent = "https://docs.google.com/forms/d/e/1FAIpQLScsBC1_jgtbtrCw-CBKCSpyVqS1DjFTq4mUmabqiI_fdrRsLA/viewform";

		System.out.println("Encoding QR code with following content " + qrCodeContent);

		final var qrCodeWriter = new QRCodeWriter();

		try {
			final var bitMatrix = qrCodeWriter.encode(qrCodeContent, BarcodeFormat.QR_CODE, 100, 100);
			final var outputFile = new File("target/qr.png");
			ImageIO.write(MatrixToImageWriter.toBufferedImage(bitMatrix), "png", outputFile);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
