using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RentApp.Models;
using System;
using System.IO;
using System.Net;
using System.Reflection;

namespace RentApp
{
    public class Startup
    {
        internal static IContainer Container { get; private set; }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            string path = System.Reflection.Assembly.GetExecutingAssembly().Location;
            var fullPath = Path.GetFullPath(path + "..\\..\\..\\..\\..\\localDB\\RentApLocalDb.mdf");
            var connection = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=" + fullPath + ";Integrated Security=True;Connect Timeout=30";

            services.AddDbContext<DataContext>(opt => opt.UseSqlServer(connection));
            services.AddMvc();
            
            var builder = new ContainerBuilder();
            builder.RegisterAssemblyModules(GetType().GetTypeInfo().Assembly);
            builder.Populate(services);

            Container = builder.Build();

            var serviceProvider = Container.Resolve<IServiceProvider>();
            return serviceProvider;

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseMvc();
            loggerFactory.AddConsole();

            var DefaultFile = new DefaultFilesOptions();
            DefaultFile.DefaultFileNames.Clear();
            DefaultFile.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(DefaultFile);

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    context.Response.StatusCode = 200;
                    await next();
                }
            });

            app.UseStaticFiles();
          
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }

    }
}
