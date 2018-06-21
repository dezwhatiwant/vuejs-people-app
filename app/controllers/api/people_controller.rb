class Api::PeopleController < ApplicationController
  def index
    @people = Person.all 
    render 'index.json.jbuilder'
  end

  def create
    @person = Person.new(
                         name: params[:name],
                         bio: params[:bio]
                         )
    @person.save
    render 'show.json.jbuilder'
  end

end
