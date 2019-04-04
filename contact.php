<?php
    if(isset($_POST['submit'])){
        $name=$_POST['name'];
        $subject=$_POST['Subject'];
        $message=$_POST['message'];
        $mailFrom=$_POST['email'];
    }
    $mailTo="chicomuerte35@gmail.com";
    $headers="Form: ".$mailFrom;
    $txt="You have received an e-mailfrom ".$name."\n\n".$message;
    mail($mailTo,$subject,$txt,$headers);
        header("Location: index.php?mailsend");
    
?>