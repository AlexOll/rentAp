﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using RentApp.Models;
using RentApp.Models.DbModels;
using RentApp.Models.Structs;
using System;

namespace RentApp.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RentApp.Models.DbModels.Flat", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Area");

                    b.Property<float>("Cost");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description");

                    b.Property<bool>("IsAlive");

                    b.Property<DateTime>("LastRepairDate");

                    b.Property<string>("PlaceId")
                        .IsRequired();

                    b.Property<int>("PropertyType");

                    b.Property<DateTime>("ReleaseDate");

                    b.Property<int>("RoomsCount");

                    b.Property<DateTime>("UpdateDate");

                    b.HasKey("Id");

                    b.ToTable("Flats");
                });

            modelBuilder.Entity("RentApp.Models.DbModels.FlatServiceType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("FlatId");

                    b.Property<int>("ServiceType");

                    b.HasKey("Id");

                    b.HasIndex("FlatId");

                    b.ToTable("FlatServiceTypes");
                });

            modelBuilder.Entity("RentApp.Models.DbModels.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("CreateDate");

                    b.Property<bool>("IsRead");

                    b.Property<int>("MessageType");

                    b.Property<Guid>("UserIdFrom");

                    b.Property<Guid>("UserIdTo");

                    b.HasKey("Id");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("RentApp.Models.DbModels.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("ActivationCode");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<bool>("IsActivated");

                    b.Property<bool>("IsAlive");

                    b.Property<string>("Lastname");

                    b.Property<string>("Password");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RentApp.Models.DbModels.FlatServiceType", b =>
                {
                    b.HasOne("RentApp.Models.DbModels.Flat", "Flat")
                        .WithMany()
                        .HasForeignKey("FlatId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
