# jci-code README
//review code

//main.java
public class TestClass {
    public void main(String args[]) {
        String userId = "get data from end user"; 
        String sqlQuery = "select * from tbluser where userId = " + userId;
    }
}

//Function.java
public class TestClass {
    public static String getValue() {
        return "some value";
    }
    public void main(String args[]) {
        for(int i=0;i<10000;i++) {
            String someValue=getValue();
            String someValue2=getValue();
            String someValue3=someValue+someValue2;
            System.out.println(someValue3);
        }
    }
}

//Generate Code
open employee.csv file, parse file and print lines

