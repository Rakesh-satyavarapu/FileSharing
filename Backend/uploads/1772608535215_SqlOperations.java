package crud;

import java.sql.*;

public class SqlOperations {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String url = "jdbc:mysql://localhost:3306/fsi";
        String user = "root";
        String pass = "root";

        try {
            Connection con = DriverManager.getConnection(url, user, pass);
            System.out.println("Connect successfully");

            // INSERT
            String sql = "INSERT INTO master(id, name) VALUES (?, ?)";
            PreparedStatement pqs = con.prepareStatement(sql);
            pqs.setInt(1, 101);
            pqs.setString(2, "Rakesh");
            pqs.executeUpdate();
            System.out.println("Record inserted");

            // SELECT
            String sc = "SELECT * FROM master";
            Statement smt = con.createStatement();
            ResultSet rs = smt.executeQuery(sc);

            while (rs.next()) {
                System.out.println(rs.getInt("id") + " - " + rs.getString("name"));
            }
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

}
