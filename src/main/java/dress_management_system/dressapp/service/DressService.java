package dress_management_system.dressapp.service;

import dress_management_system.dressapp.model.Dress;
import dress_management_system.dressapp.repository.DressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DressService {

    @Autowired
    private DressRepository dressRepository;

    public List<Dress> getAllDresses() {
        return dressRepository.findAll();
    }

    public void addDress(Dress dress) {
        dressRepository.save(dress);
    }

    // Handle Optional in getDressById
    public Dress getDressById(int id) {
        Optional<Dress> dressOptional = dressRepository.findById(id);
        return dressOptional.orElseThrow(() -> new RuntimeException("Dress not found with id: " + id));
    }

    // Update dress with error handling
    public void updateDress(int id, Dress dress) {
        if (dressRepository.existsById(id)) {
            dress.setId(id); // Ensure you're updating the existing dress
            dressRepository.updateDress(id, dress);
        } else {
            throw new RuntimeException("Dress not found with id: " + id);
        }
    }

    // Delete dress with error handling
    public void deleteDress(int id) {
        if (dressRepository.existsById(id)) {
            dressRepository.deleteById(id);
        } else {
            throw new RuntimeException("Dress not found with id: " + id);
        }
    }
}