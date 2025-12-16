import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteModalitiesSection } from "@/components/site/sections/site-modalities";

describe("SiteModalitiesSection", () => {
    it("renders null when both services are disabled", () => {
        const { container } = render(
            <SiteModalitiesSection
                onlineService={false}
                inPersonService={false}
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders null when both services are undefined", () => {
        const { container } = render(
            <SiteModalitiesSection
                onlineService={undefined}
                inPersonService={undefined}
                primaryColor="#6366f1"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders section with title when at least one service is enabled", () => {
        render(
            <SiteModalitiesSection
                onlineService={true}
                inPersonService={false}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Modalidades de Atendimento")).toBeInTheDocument();
    });

    it("renders online service card when enabled", () => {
        render(
            <SiteModalitiesSection
                onlineService={true}
                inPersonService={false}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Atendimento Online")).toBeInTheDocument();
    });

    it("renders in-person service card when enabled", () => {
        render(
            <SiteModalitiesSection
                onlineService={false}
                inPersonService={true}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Atendimento Presencial")).toBeInTheDocument();
    });

    it("renders both service cards when both are enabled", () => {
        render(
            <SiteModalitiesSection
                onlineService={true}
                inPersonService={true}
                primaryColor="#6366f1"
            />
        );

        expect(screen.getByText("Atendimento Online")).toBeInTheDocument();
        expect(screen.getByText("Atendimento Presencial")).toBeInTheDocument();
    });

    it("applies primary color to title", () => {
        render(
            <SiteModalitiesSection
                onlineService={true}
                inPersonService={false}
                primaryColor="#ff0000"
            />
        );

        const title = screen.getByText("Modalidades de Atendimento");
        expect(title).toHaveStyle({ color: "#ff0000" });
    });
});
