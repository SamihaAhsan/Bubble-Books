package com.bubblebooks.bubblebooks.dto;

import java.util.UUID;

import com.bubblebooks.bubblebooks.models.MyRequest;

public class MyRequestResponse {

    private final UUID request_id;
    private final UUID sent_id;
    private final UUID received_id;
    private final UUID book_requested;
    private final UUID book_give;
    private final UUID book_posting_id;
    private final UUID account_posted_id;
    private final String book_name;
    private final String author_first_name;
    private final String author_last_name;
    private final String direction;

    public MyRequestResponse(MyRequest request, Bookdto book, UUID currentUserId) {
        this.request_id = request.getRequest_id();
        this.sent_id = request.getSent_id();
        this.received_id = request.getReceived_id();
        this.book_requested = request.getBook_requested();
        this.book_give = request.getBook_give();
        this.book_posting_id = request.getBook_posting_id();
        this.account_posted_id = request.getReceived_id();
        this.book_name = book.getBook_name();
        this.author_first_name = book.getAuthor_first_name();
        this.author_last_name = book.getAuthor_last_name();
        this.direction = currentUserId.equals(request.getSent_id()) ? "sent" : "received";
    }

    public UUID getRequest_id() {
        return request_id;
    }

    public UUID getSent_id() {
        return sent_id;
    }

    public UUID getReceived_id() {
        return received_id;
    }

    public UUID getBook_requested() {
        return book_requested;
    }

    public UUID getBook_give() {
        return book_give;
    }

    public UUID getBook_posting_id() {
        return book_posting_id;
    }

    public UUID getAccount_posted_id() {
        return account_posted_id;
    }

    public String getBook_name() {
        return book_name;
    }

    public String getAuthor_first_name() {
        return author_first_name;
    }

    public String getAuthor_last_name() {
        return author_last_name;
    }

    public String getDirection() {
        return direction;
    }
}
