package com.bubblebooks.bubblebooks.Utilities.Constants;
import java.util.Map;

public class ReccomendationConstants {

    // allowed statuses
    public enum TradeMatchStatus {
    EXCELLENT_MATCH,
    GOOD_MATCH,
    POTENTIAL_MATCH,
    WEAK_MATCH
}

    // map of adjacent genres

   private static final Map<String, String[]> adjacentGenres = Map.ofEntries(
    Map.entry("Romance", new String[]{
        "Contemporary Fiction", "Young Adult", "Historical Fiction", "Fantasy"
    }),

    Map.entry("Fantasy", new String[]{
        "Science Fiction", "Young Adult", "Romance", "Dystopian",
        "Horror", "Graphic Novels & Comics", "Manga"
    }),

    Map.entry("Science Fiction", new String[]{
        "Fantasy", "Dystopian", "Thriller", "Science & Technology",
        "Contemporary Fiction"
    }),

    Map.entry("Mystery", new String[]{
        "Thriller", "True Crime", "Horror", "Historical Fiction",
        "Contemporary Fiction"
    }),

    Map.entry("Thriller", new String[]{
        "Mystery", "Horror", "True Crime", "Science Fiction",
        "Contemporary Fiction"
    }),

    Map.entry("Horror", new String[]{
        "Thriller", "Mystery", "Fantasy", "Science Fiction", "Young Adult"
    }),

    Map.entry("Contemporary Fiction", new String[]{
        "Romance", "Young Adult", "Short Stories", "Classics", "Mystery"
    }),

    Map.entry("Historical Fiction", new String[]{
        "Romance", "History", "Classics", "Mystery", "Biography & Memoir"
    }),

    Map.entry("Young Adult", new String[]{
        "Fantasy", "Romance", "Dystopian", "Contemporary Fiction",
        "Science Fiction", "Manga"
    }),

    Map.entry("Classics", new String[]{
        "Contemporary Fiction", "Historical Fiction", "Philosophy",
        "Poetry", "Short Stories"
    }),

    Map.entry("Dystopian", new String[]{
        "Science Fiction", "Fantasy", "Young Adult", "Thriller"
    }),

    Map.entry("Biography & Memoir", new String[]{
        "History", "Contemporary Fiction", "Business & Finance",
        "Religion & Spirituality"
    }),

    Map.entry("History", new String[]{
        "Historical Fiction", "Biography & Memoir", "Philosophy",
        "Religion & Spirituality"
    }),

    Map.entry("Philosophy", new String[]{
        "Classics", "Religion & Spirituality", "History", "Science & Technology"
    }),

    Map.entry("Business & Finance", new String[]{
        "Biography & Memoir", "Science & Technology", "Philosophy"
    }),

    Map.entry("Science & Technology", new String[]{
        "Science Fiction", "Business & Finance", "Philosophy"
    }),

    Map.entry("Religion & Spirituality", new String[]{
        "Philosophy", "History", "Biography & Memoir"
    }),

    Map.entry("True Crime", new String[]{
        "Mystery", "Thriller", "History", "Biography & Memoir"
    }),

    Map.entry("Graphic Novels & Comics", new String[]{
        "Manga", "Fantasy", "Science Fiction", "Horror", "Young Adult"
    }),

    Map.entry("Manga", new String[]{
        "Graphic Novels & Comics", "Fantasy", "Romance",
        "Young Adult", "Science Fiction"
    }),

    Map.entry("Poetry", new String[]{
        "Classics", "Short Stories", "Contemporary Fiction"
    }),

    Map.entry("Short Stories", new String[]{
        "Contemporary Fiction", "Classics", "Poetry", "Horror", "Mystery"
    }),

    Map.entry("Children's Books", new String[]{
        "Fantasy", "Graphic Novels & Comics", "Manga"
    }),

    Map.entry("Other", new String[]{})
);

//score calculation
public TradeMatchStatus calculateTradeStatus(double score) {
    if (score >= 80) return TradeMatchStatus.EXCELLENT_MATCH;
    if (score >= 60) return TradeMatchStatus.GOOD_MATCH;
    if (score >= 40) return TradeMatchStatus.POTENTIAL_MATCH;
    return TradeMatchStatus.WEAK_MATCH;
}


}
