package com.bubblebooks.bubblebooks.dto;

public class Genresdto {

    public String[] genres;

    public Genresdto(){
    }

    public Genresdto(String[] genres){
        this.genres=genres;
    }

    public String[] getGenres(){
        return genres;
    }

    public void setGenres(String[] genres){
        this.genres=genres;
    }

    
}
