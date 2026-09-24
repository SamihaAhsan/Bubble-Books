import java.util.UUID;

public class User {
    private String firstName;
    private String lastname;
    private String username;
    private String location;
    private UUID user_id;
    
    public User(String firstName, String lastname, String username, String location, UUID user_id) {
        this.firstName = firstName;
        this.lastname = lastname;
        this.username = username;
        this.location = location;
        this.user_id = user_id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public String getUsername() {
        return username;
    }

    public String getLocation() {
        return location;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    



}
