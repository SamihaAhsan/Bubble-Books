// package com.bubblebooks.bubblebooks.Utilities;
// import org.springframework.security.core.Authentication;

// import com.bubblebooks.bubblebooks.models.MyPosting;


// // gotta keep track of previous trades

// public class ReccomendationAlgorithm {
//     // How algorithm will work: (has to be considered 2 ways)
//     // 1. Consider genres they chose as preferences
//     // 2. Consider the books they have selected as titles they are interested in
//     // 3. Consider location and feasibility for a trade between 2 people
//     // 4. Consider genres of books they have selected as titles they are interested in
//     //  5. Consider authors if seeing similar authors in previous trades and titles they are considering
//     // consider adjacent genres to the genres they have selected as preferences and titles they are interested in
   


//     // i search up a book and author that i want
//     // i should be shown the requests that will work best based on the searched titles 
// // for that i only consider the users location since im under the impression they searched the book cuz they want it
// // for the postings - i gotta consider location, genres that maysuit a book they have posted, basically all of the factors i needa consider
// so i needa go through every posting for that book ig - 

// // initial filter: book title, author, location and you have preferred genes they like

//     public static void titleRecommendedPostings(Authentication auth, String title, String author) {
//         List<MyPosting> postings =
//     myPostingRepo.findAvailablePostingsByBookAndAuthor(
//         bookName,
//         author

//     );

//     // get all books matching title author, location and adjacent+preferred genres 


//     }

//     private static void adjacentGenres(){

//     }
// }
