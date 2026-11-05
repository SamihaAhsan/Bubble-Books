package com.bubblebooks.bubblebooks.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public class GenresdtoId implements Serializable {
    private UUID genre_id;
    private UUID account_id;

    public GenresdtoId() {
    }

    public GenresdtoId(UUID genre_id, UUID account_id) {
        this.genre_id = genre_id;
        this.account_id = account_id;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (!(other instanceof GenresdtoId that)) {
            return false;
        }
        return Objects.equals(genre_id, that.genre_id)
                && Objects.equals(account_id, that.account_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(genre_id, account_id);
    }
}
