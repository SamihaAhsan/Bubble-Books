package com.bubblebooks.bubblebooks.models;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name="requests")
public class MyRequest {

    @Id 
    @GeneratedValue
    @UuidGenerator

    private UUID request_id;

    private UUID sent_id;

    private UUID received_id;

    private UUID book_requested;

    private UUID book_give;

    private UUID book_posting_id;

    public MyRequest() {
    }

    public MyRequest(UUID request_id, UUID sent_id, UUID received_id, UUID book_requested, UUID book_give, UUID book_posting_id) {
        this.request_id = request_id;
        this.sent_id = sent_id;
        this.received_id = received_id;
        this.book_requested = book_requested;
        this.book_give = book_give;
        this.book_posting_id = book_posting_id;
    }

    public MyRequest(UUID request_id, UUID sent_id, UUID received_id, UUID book_requested, UUID book_give) {
        this.request_id = request_id;
        this.sent_id = sent_id;
        this.received_id = received_id;
        this.book_requested = book_requested;
        this.book_give = book_give;
    }
    
    public UUID getRequest_id() {
        return request_id;
    }

    public void setRequest_id(UUID request_id) {
        this.request_id = request_id;
    }

    public UUID getSent_id() {
        return sent_id;
    }

    public void setSent_id(UUID sent_id) {
        this.sent_id = sent_id;
    }

    public UUID getReceived_id() {
        return received_id;
    }

    public void setReceived_id(UUID received_id) {
        this.received_id = received_id;
    }

    public UUID getBook_requested() {
        return book_requested;
    }

    public void setBook_requested(UUID book_requested) {
        this.book_requested = book_requested;
    }

    public UUID getBook_give() {
        return book_give;
    }

    public void setBook_give(UUID book_give) {
        this.book_give = book_give;
    }

    public UUID getBook_posting_id() {
        return book_posting_id;
    }

    public void setBook_posting_id(UUID book_posting_id) {
        this.book_posting_id = book_posting_id;
    }

}
