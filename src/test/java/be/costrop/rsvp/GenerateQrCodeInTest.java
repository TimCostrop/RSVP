package be.costrop.rsvp;

import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.google.zxing.qrcode.encoder.ByteMatrix;
import com.google.zxing.qrcode.encoder.Encoder;
import com.google.zxing.qrcode.encoder.QRCode;
import org.jfree.graphics2d.svg.SVGGraphics2D;
import org.junit.jupiter.api.Test;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class GenerateQrCodeInTest {
	private static final int SIZE = 400;

	private static BufferedImage renderQRImage(QRCode code) {
		final var image = new BufferedImage(SIZE, SIZE, BufferedImage.TYPE_INT_ARGB);
		final var graphics = image.createGraphics();

		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		graphics.setBackground(new Color(0, 0, 0, 0));
		graphics.clearRect(0, 0, SIZE, SIZE);
		graphics.setColor(Color.black);

		ByteMatrix input = code.getMatrix();
		if (input == null) {
			throw new IllegalStateException();
		}

		final int quietZone = 4;
		final int inputWidth = input.getWidth();
		final int inputHeight = input.getHeight();
		final int qrWidth = inputWidth + (quietZone * 2);
		final int qrHeight = inputHeight + (quietZone * 2);
		final int outputWidth = Math.max(SIZE, qrWidth);
		final int outputHeight = Math.max(SIZE, qrHeight);

		final int multiple = Math.min(outputWidth / qrWidth, outputHeight / qrHeight);
		final int leftPadding = (outputWidth - (inputWidth * multiple)) / 2;
		final int topPadding = (outputHeight - (inputHeight * multiple)) / 2;
		final int FINDER_PATTERN_SIZE = 7;
		final float CIRCLE_SCALE_DOWN_FACTOR = .9f;
		final int circleSize = (int) (multiple * CIRCLE_SCALE_DOWN_FACTOR);

		for (int inputY = 0, outputY = topPadding; inputY < inputHeight; inputY++, outputY += multiple) {
			for (int inputX = 0, outputX = leftPadding; inputX < inputWidth; inputX++, outputX += multiple) {
				if (input.get(inputX, inputY) == 1) {
					if (!(inputX <= FINDER_PATTERN_SIZE && inputY <= FINDER_PATTERN_SIZE ||
						  inputX >= inputWidth - FINDER_PATTERN_SIZE && inputY <= FINDER_PATTERN_SIZE ||
						  inputX <= FINDER_PATTERN_SIZE && inputY >= inputHeight - FINDER_PATTERN_SIZE)) {
						graphics.fillOval(outputX, outputY, circleSize, circleSize);
					}
				}
			}
		}

		int circleDiameter = multiple * FINDER_PATTERN_SIZE;
		drawFinderPatternCircleStyle(graphics, leftPadding, topPadding, circleDiameter);
		drawFinderPatternCircleStyle(graphics, leftPadding + (inputWidth - FINDER_PATTERN_SIZE) * multiple, topPadding, circleDiameter);
		drawFinderPatternCircleStyle(graphics, leftPadding, topPadding + (inputHeight - FINDER_PATTERN_SIZE) * multiple, circleDiameter);

		return image;
	}

	private static void drawFinderPatternCircleStyle(Graphics2D graphics, int x, int y, int circleDiameter) {
		final int WHITE_CIRCLE_DIAMETER = circleDiameter * 5 / 7;
		final int WHITE_CIRCLE_OFFSET = circleDiameter / 7;
		final int MIDDLE_DOT_DIAMETER = circleDiameter * 3 / 7;
		final int MIDDLE_DOT_OFFSET = circleDiameter * 2 / 7;

		graphics.setColor(Color.black);
		graphics.fillOval(x, y, circleDiameter, circleDiameter);
		graphics.setColor(Color.white);
		graphics.fillOval(x + WHITE_CIRCLE_OFFSET, y + WHITE_CIRCLE_OFFSET, WHITE_CIRCLE_DIAMETER, WHITE_CIRCLE_DIAMETER);
		graphics.setColor(Color.black);
		graphics.fillOval(x + MIDDLE_DOT_OFFSET, y + MIDDLE_DOT_OFFSET, MIDDLE_DOT_DIAMETER, MIDDLE_DOT_DIAMETER);
	}

	private static String convertImageToSVG(BufferedImage image) {
		final var svgImage = new SVGGraphics2D(SIZE, SIZE);
		svgImage.drawImage(image, 0, 0, SIZE, SIZE, null);
		return svgImage.getSVGElement(null, true, null, null, null);
	}

	@Test
	void shouldIWantAQrCode_generateOne() {
		final var qrCodeContent = "https://tim-en-laura-anne-trouwen.be";

		System.out.println("Encoding QR code with following content " + qrCodeContent);

		try {
			final var qrCode = Encoder.encode(qrCodeContent, ErrorCorrectionLevel.L, Map.of(
				EncodeHintType.CHARACTER_SET, StandardCharsets.UTF_8.displayName(),
				EncodeHintType.QR_COMPACT, true
			));
			final var image = renderQRImage(qrCode);
			final var svgQrCode = convertImageToSVG(image);

			Files.writeString(Paths.get("target/qr.svg"), svgQrCode);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
