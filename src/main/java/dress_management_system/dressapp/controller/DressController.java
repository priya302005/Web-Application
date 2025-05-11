package dress_management_system.dressapp.controller;

import dress_management_system.dressapp.model.Dress;
import dress_management_system.dressapp.service.DressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/dresses")
@CrossOrigin(origins = "*") // Add CORS support for frontend
public class DressController {

    @Autowired
    private DressService dressService;

    // Get all dresses
    @GetMapping
    public List<Dress> getAllDresses() {
        return dressService.getAllDresses();
    }

    // Get dress by ID
    @GetMapping("/{id}")
    public Dress getDressById(@PathVariable int id) {
        return dressService.getDressById(id);
    }

    // Add dress through JSON body - add this method
    @PostMapping
    public ResponseEntity<String> addDress(@RequestBody Dress dress) {
        try {
            dressService.addDress(dress);
            return ResponseEntity.status(HttpStatus.CREATED).body("Dress added successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding dress: " + e.getMessage());
        }
    }

    // Add dress with image upload
    @PostMapping("/upload-dress")
    public ResponseEntity<String> uploadDress(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("price") double price,
        @RequestParam("size") String size,
        @RequestParam("color") String color,
        @RequestParam("quantity") int quantity,
        @RequestParam("image") MultipartFile imageFile
    ) {
        // Null checks for mandatory fields
        if (name == null || name.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Name is required.");
        }
        if (description == null || description.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Description is required.");
        }
        if (size == null || size.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Size is required.");
        }
        if (color == null || color.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Color is required.");
        }
        if (imageFile == null || imageFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Image file is required.");
        }

        try {
            // Check if the image filename is null or empty
            String fileName = imageFile.getOriginalFilename();
            if (fileName == null || fileName.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No filename found for the uploaded image.");
            }

            // Clean the file name to avoid path traversal issues
            fileName = StringUtils.cleanPath(fileName);

            // Define the upload directory path
            String uploadDir = "C:/Users/Priya Dharshini/Desktop/uploaded-images/";
            String filePath = uploadDir + fileName;

            // Create directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the image to the folder
            imageFile.transferTo(new File(filePath));

            // Create a Dress object
            Dress dress = new Dress();
            dress.setName(name);
            dress.setDescription(description);
            dress.setPrice(price);
            dress.setSize(size);
            dress.setColor(color);
            dress.setQuantity(quantity);
            dress.setImageUrl(fileName); // Store only the file name (not the full path)

            // Save the dress
            dressService.addDress(dress);

            return ResponseEntity.status(HttpStatus.CREATED).body("Dress uploaded successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading dress. Please try again.");
        }
    }

    // Update dress normally (JSON body)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateDress(@PathVariable int id, @RequestBody Dress dress) {
        try {
            dressService.updateDress(id, dress);
            return ResponseEntity.ok("Dress updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error updating dress: " + e.getMessage());
        }
    }

    // Delete dress
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDress(@PathVariable int id) {
        try {
            dressService.deleteDress(id);
            return ResponseEntity.ok("Dress deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error deleting dress: " + e.getMessage());
        }
    }
}