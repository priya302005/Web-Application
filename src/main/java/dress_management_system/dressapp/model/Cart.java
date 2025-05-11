package dress_management_system.dressapp.model;

public class Cart {
    private int id;
    private int userId;
    private int dressId;
    private int quantity;

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public int getDressId() {
        return dressId;
    }
    public void setDressId(int dressId) {
        this.dressId = dressId;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
