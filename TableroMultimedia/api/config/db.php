<?php
class Database {
    private $host = "localhost";
    private $db_name = "sonomiel";
    private $username = "sonmiel_user";
    private $password = "123456";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->db_name, 
                              $this->username, 
                              $this->password);
        return $this->conn;
    }
}
?>
