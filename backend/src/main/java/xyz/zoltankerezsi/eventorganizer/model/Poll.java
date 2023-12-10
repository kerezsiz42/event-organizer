package xyz.zoltankerezsi.eventorganizer.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "poll")
public class Poll {
    @Id
    @Column(name = "poll_id")
    private String pollId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "final_cost", nullable = true)
    private Long finalCost;

    @Column(name = "multiple_choice")
    private Boolean multipleChoice;

    @OneToMany(mappedBy = "option")
    private List<Option> options;

    @OneToMany(mappedBy = "vote")
    private List<Vote> votes;
}
