package com.bubblebooks.bubblebooks.Utilities;

import java.util.List;

import org.springframework.stereotype.Service;
import com.bubblebooks.bubblebooks.models.Book;
import com.bubblebooks.bubblebooks.models.MyPosting;
import com.bubblebooks.bubblebooks.repositories.MyPostingRepos;

@Service
public class ReccomendationAlgorithm {

    // gotta keep track of previous trades
    // How algorithm will work: (has to be considered 2 ways)
    // 1. Consider genres they chose as preferences
    // 2. Consider the books they have selected as titles they are interested in
    // 3. Consider location and feasibility for a trade between 2 people
    // 4. Consider genres of books they have selected as titles they are interested in
    // 5. Consider authors if seeing similar authors in previous trades and titles they are considering
    // consider adjacent genres to the genres they have selected as preferences and titles they are interested in

    // i search up a book and author that i want
    // i should be shown the requests that will work best based on the searched titles
    // for that i only consider the users location since im under the impression they searched the book cuz they want it
    // for the postings - i gotta consider location, genres that may suit a book they have posted,
    // basically all of the factors i needa consider
    // so i needa go through every posting for that book ig -
    // initial filter: book title, author, location and preferred genres they like

    private final MyPostingRepos myPostingRepos;

    public ReccomendationAlgorithm(MyPostingRepos myPostingRepos) {
        this.myPostingRepos = myPostingRepos;
    }

    public List<MyPosting> titleRecommendedPostings(String title, String author) {
        return myPostingRepos.findPostingsByBookAndAuthor(title.trim(), author.trim());
    }

    //accounts for 45% 
    public double cityMatchStatus(String mycity, String theircity){
        if (mycity.equals(theircity)){
            return 1;
        }
        return 0;
    }

    //this is for exact title matches
    // accounts 55%  
    public double titleMatchStatus(Book [] theirinterestedtitles, Book [] mybooks){
        for (Book mybook : mybooks) {
            for (Book interestedTitle : theirinterestedtitles) {
                if (mybook.getBook_name().equalsIgnoreCase(interestedTitle.getBook_name())) {
                    return 1;
                }
            }
        }
        return 0;
    }

    // author they are interested in
    // accounts for 30%

    

    //genre match
    //only exact genre matches



    public void createObject(String title, String author){
        List<MyPosting> matchingPosts=titleRecommendedPostings(title, author);
        
        

    }
}
