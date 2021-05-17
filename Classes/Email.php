<?php

namespace Classes;

use Classes\Exceptions\EmailException;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Email {
    public static function sendEmail($email, $body) {
        if(empty($email))
            throw new EmailException('Destinatário não informado');            

        set_time_limit(60);

        $mail = new PHPMailer();

        //Server settings
        $mail->isSMTP();

        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        
        $mail->Timeout = 60;
        
        $mail->Host = 'mail.elielbatiston.life';
        $mail->Hostname = 'mail.elielbatiston.life';

        $mail->SMTPAuth = 1;

        $mail->Username = 'coderockr@elielbatiston.life';
        $mail->Password = 'Abc123@!';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        //Recipients
        $mail->setFrom(
            $email, 
            'Rede de eventos sociais'
        );
        
        $mail->addAddress($email);

        // Content
        $mail->isHTML(true);
        
        $mail->Subject = 'Convite de Amizade';
        $mail->Body = $body;
    
        try {
            $mail->send();            
        } catch(\Exception $ex) {
            throw new EmailException($ex->getMessage());
        }        
        
        if(!empty($mail->ErrorInfo))
            throw new EmailException($mail->ErrorInfo);        
    
        $mail->ClearAllRecipients();
        $mail->ClearAttachments();
        
        return true;
    }
}